import OpenAI from 'openai';
import {screeningConfig} from '#root/config/screening.js';
import {ScreeningLlm, ScreeningLlmError, parseJsonObject} from './ScreeningLlm.js';

/**
 * MiniMax implementation — the intended production path.
 * Enabled by SCREENING_PROVIDER=minimax.
 *
 * The prompts already instruct "reply ONLY with JSON"; we set a tiny system
 * prompt reinforcing that and parse defensively (JSON schema is enforced by the
 * shared verdict validators upstream). Timeout + retries via the SDK.
 */
export class MinimaxScreeningLlm implements ScreeningLlm {
  readonly provider = 'minimax';
  readonly model = screeningConfig.minimax.model;

  async askJson(prompt: string): Promise<Record<string, unknown>> {
    const {apiKey, model, baseURL} = screeningConfig.minimax;
    if (!apiKey) throw new ScreeningLlmError('MINIMAX_API_KEY not set');

    const client = new OpenAI({
      apiKey,
      baseURL,
      timeout: screeningConfig.timeoutMs,
      maxRetries: screeningConfig.maxRetries,
    });

    try {
      const res = await client.chat.completions.create({
        model,
        max_tokens: 400,
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: 'You are a strict screening classifier. Reply with ONLY a single JSON object — no prose, no code fences.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });
      const text = res.choices[0]?.message?.content ?? '';
      return parseJsonObject(text);
    } catch (err) {
      if (err instanceof ScreeningLlmError) throw err;
      throw new ScreeningLlmError('minimax call failed', err);
    }
  }
}
