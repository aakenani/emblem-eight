import { urlFor } from './sanity';

export async function generateAIInsights(image: any, locale: string): Promise<string> {
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    // Get the image URL
    const imageUrl = image.r2Url || urlFor(image.image).width(800).url();
    
    // Prepare the prompt based on locale
    const prompt = locale === 'ar'
      ? `قم بتحليل هذه الصورة وقدم رؤى مفصلة حول محتواها وسياقها وأهميتها. صف العناصر الرئيسية والموضوعات والخصائص البصرية. إذا كانت الصورة تحتوي على نص أو رموز، فقم بوصفها.`
      : `Analyze this image and provide detailed insights about its content, context, and significance. Describe the key elements, themes, and visual characteristics. If the image contains text or symbols, describe them.`;

    // Call OpenAI API (GPT-4 Vision)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI insights generation error:', error);
    
    // Return a fallback insight
    return locale === 'ar'
      ? 'تعذر إنشاء رؤى الذكاء الاصطناعي في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً.'
      : 'Unable to generate AI insights at this time. Please try again later.';
  }
}

