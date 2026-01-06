import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import toolsData from '../../../data/tools.json';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Create a list of all tool names and categories for context
    const toolsList = toolsData.tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      category: tool.category,
      description: tool.shortDescription,
      tags: tool.tags
    }));

    // AI Prompt to analyze user need and recommend tools
    const prompt = `You are a software recommendation expert. A user has described their need as: "${query}"

Here are the available tools in our database:
${JSON.stringify(toolsList, null, 2)}

Based on the user's need, recommend the TOP 3 most relevant tools from the list above. Consider:
1. The user's specific problem or goal
2. Tool features and categories
3. Common use cases

Respond ONLY with a JSON array of tool IDs (strings) in order of relevance. Example format:
["tool-id-1", "tool-id-2", "tool-id-3"]

Your response must be valid JSON with no additional text, explanation, or markdown formatting. Just the raw JSON array.`;

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text().trim();

    // Remove markdown code blocks if present
    let cleanedResponse = responseText;
    if (responseText.startsWith('```json')) {
      cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    } else if (responseText.startsWith('```')) {
      cleanedResponse = responseText
        .replace(/```\n?/g, '')
        .trim();
    }

    // Parse the AI response
    let recommendedIds;
    try {
      recommendedIds = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanedResponse);
      console.error('Original response:', responseText);
      return NextResponse.json(
        { error: 'Invalid AI response format', details: cleanedResponse },
        { status: 500 }
      );
    }

    // Validate that we got an array
    if (!Array.isArray(recommendedIds)) {
      console.error('AI response is not an array:', recommendedIds);
      return NextResponse.json(
        { error: 'AI response must be an array of tool IDs' },
        { status: 500 }
      );
    }

    // Get full tool details for recommended IDs
    const recommendedTools = recommendedIds
      .map(id => toolsData.tools.find(tool => tool.id === id))
      .filter(tool => tool !== undefined);

    // If no valid tools found, return all tools as fallback
    if (recommendedTools.length === 0) {
      console.warn('No valid tools found in AI response, returning top 3 tools');
      return NextResponse.json({
        query,
        recommendations: toolsData.tools.slice(0, 3),
        count: 3,
        fallback: true
      });
    }

    return NextResponse.json({
      query,
      recommendations: recommendedTools,
      count: recommendedTools.length
    });

  } catch (error) {
    console.error('AI recommendation error:', error);
    return NextResponse.json(
      { error: 'Failed to get recommendations', details: error.message },
      { status: 500 }
    );
  }
}