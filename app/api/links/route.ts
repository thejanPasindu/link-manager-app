import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import axios from 'axios';

const prisma = new PrismaClient();

async function fetchMetadata(url: string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    
    // Basic metadata extraction
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i);
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)/i);

    return {
      title: titleMatch ? titleMatch[1] : null,
      description: descriptionMatch ? descriptionMatch[1] : null,
      thumbnail: ogImageMatch ? ogImageMatch[1] : null
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: null,
      description: null,
      thumbnail: null
    };
  }
}

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      include: {
        category: true
      }
    });
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { url, categoryId } = await request.json();
    
    // Fetch metadata from the URL
    const metadata = await fetchMetadata(url);
    
    // Create link with metadata
    const link = await prisma.link.create({
      data: {
        url,
        categoryId,
        title: metadata.title,
        description: metadata.description,
        thumbnail: metadata.thumbnail
      },
      include: {
        category: true
      }
    });
    
    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}