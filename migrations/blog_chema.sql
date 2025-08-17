CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255),
    tags TEXT[],
    cover_image_url TEXT,
    published BOOLEAN DEFAULT FALSE,
    read_time INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    count_of_views INTEGER DEFAULT 0,
    language language DEFAULT 'fr',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);