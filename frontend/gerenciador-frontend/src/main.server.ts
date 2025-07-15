import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Define __dirname para ambientes ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lê o arquivo HTML base para SSR
const document = readFileSync(join(__dirname, 'index.html'), 'utf-8');

export default function render(url: string): Promise<string> {
  return renderApplication(
    () => bootstrapApplication(AppComponent, {
      providers: [provideHttpClient()]
    }),
    {
      document,
      url
    }
  );
}
