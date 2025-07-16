<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class SuggestionController extends Controller
{
    public function suggest(Request $request)
    {
        $summary = $request->input('summary');

        if (!$summary) {
            return response()->json(['error' => 'Summary data is required'], 400);
        }

        $client = new Client();
        $apiKey = env('OPENAI_API_KEY');

        $prompt = "Usuário gastou o seguinte no último mês: \n" . json_encode($summary, JSON_PRETTY_PRINT) . "\n\nBaseado nisso, sugira 3 dicas para melhorar os gastos.";

        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => "Bearer $apiKey",
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
                'max_tokens' => 300,
                'temperature' => 0.7,
            ],
        ]);

        $body = json_decode($response->getBody(), true);

        $suggestions = $body['choices'][0]['message']['content'] ?? 'Sem sugestões disponíveis';

        return response()->json(['suggestions' => $suggestions]);
    }
}
