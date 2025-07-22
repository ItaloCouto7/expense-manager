<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class SuggestionController extends Controller
{
    public function suggest(Request $request)
    {
        $summary = $request->input('summary');

        if (!$summary) {
            return response()->json(['error' => 'Summary data is required'], 400);
        }

        $client = new Client();
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json(['error' => 'API key not configured'], 500);
        }

        $prompt = "Analise os gastos do usuário do último mês e forneça 3 sugestões práticas para melhorar o controle financeiro:\n\n"
            . "Dados dos gastos:\n"
            . json_encode($summary, JSON_PRETTY_PRINT)
            . "\n\nPor favor, responda em formato JSON com as seguintes chaves:"
            . "\n- 'analise': uma análise breve dos gastos"
            . "\n- 'sugestoes': array com 3 dicas práticas"
            . "\n- 'economia_estimada': estimativa de economia em percentual";

        try {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}";

            $response = $client->post($url, [
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'topK' => 40,
                        'topP' => 0.95,
                        'maxOutputTokens' => 1024,
                    ],
                    'safetySettings' => [
                        [
                            'category' => 'HARM_CATEGORY_HARASSMENT',
                            'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_HATE_SPEECH',
                            'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'
                        ]
                    ]
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            if (isset($body['candidates'][0]['content']['parts'][0]['text'])) {
                $suggestions = $body['candidates'][0]['content']['parts'][0]['text'];

                $jsonSuggestions = json_decode($suggestions, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    return response()->json([
                        'success' => true,
                        'data' => $jsonSuggestions
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'suggestions' => $suggestions
                ]);
            } else {
                return response()->json(['error' => 'Sem sugestões disponíveis'], 500);
            }

        } catch (RequestException $e) {
            \Log::error('Gemini API Error: ' . $e->getMessage());

            if ($e->hasResponse()) {
                $errorResponse = json_decode($e->getResponse()->getBody(), true);
                return response()->json([
                    'error' => 'Erro na API: ' . ($errorResponse['error']['message'] ?? 'Erro desconhecido')
                ], 500);
            }

            return response()->json(['error' => 'Erro de conexão com a API'], 500);
        }
    }
}
