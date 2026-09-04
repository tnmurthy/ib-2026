const axios = require('axios');

class LLMProvider {
    constructor() {
        this.ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    }

    /**
     * Generate content using an LLM provider
     * @param {string} prompt 
     * @param {Object} options 
     */
    async generate(prompt, { provider = 'ollama', model = 'qwen2.5-coder:7b-instruct-q4_K_M', temperature = 0.7, systemPrompt = '' } = {}) {
        try {
            if (provider === 'ollama') {
                return await this._callOllama(prompt, model, temperature, systemPrompt);
            } else {
                throw new Error(`Unsupported provider: ${provider}`);
            }
        } catch (error) {
            console.error(`LLM generation error (${provider}):`, error.message);
            return { text: null, error: error.message };
        }
    }

    async _callOllama(prompt, model, temperature, systemPrompt) {
        const payload = {
            model: model,
            prompt: prompt,
            stream: false,
            options: {
                temperature: temperature
            }
        };

        if (systemPrompt) {
            payload.system = systemPrompt;
        }

        const response = await axios.post(`${this.ollamaUrl}/api/generate`, payload);
        const data = response.data;

        return {
            text: data.response,
            tokens: (data.prompt_eval_count || 0) + (data.eval_count || 0)
        };
    }
}

const llm = new LLMProvider();
module.exports = { llm };
