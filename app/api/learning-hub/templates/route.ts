import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the template name from the query parameters
    const url = new URL(request.url);
    const templateName = url.searchParams.get('template');

    if (!templateName) {
      return NextResponse.json(
        { error: 'Template name is required' },
        { status: 400 }
      );
    }

    // Make sure we're only accessing files from the templates directory
    // and they have .md extension for security
    if (!templateName.endsWith('.md') || templateName.includes('..')) {
      return NextResponse.json(
        { error: 'Invalid template name' },
        { status: 400 }
      );
    }

    // Define the template file path
    const templatePath = path.join(
      process.cwd(),
      'app',
      'learning-hub',
      'templates',
      templateName
    );

    // Read the template file
    const content = await readFile(templatePath, 'utf-8');

    // Return the content
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    
    // Check if error is because file doesn't exist
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Error fetching template' },
      { status: 500 }
    );
  }
} 