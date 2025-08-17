CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid VARCHAR(255) UNIQUE NOT NULL, -- Firebase UID
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    secondary_phone_numbers TEXT[], -- Array of phone numbers
    secondary_email VARCHAR(255),
    country_code VARCHAR(10),
    country_id VARCHAR(10),
    birthday DATE,
    gender user_gender,
    photo_url TEXT,
    avatar_image TEXT,
    estimated_survival_time INTEGER, -- in days
    invited_by UUID REFERENCES users(id),
    is_dead BOOLEAN DEFAULT FALSE,
    is_washer BOOLEAN DEFAULT FALSE,
    has_funeral_profile BOOLEAN DEFAULT FALSE,
    account_status account_status DEFAULT 'pending_verification',
    language language DEFAULT 'fr',
    place_of_death_country_of_residence TEXT[], -- [1st, 2nd, 3rd]
    place_of_death_abroad TEXT[], -- [1st, 2nd, 3rd]
    burial_exceptions_local TEXT[], -- [1st, 2nd, 3rd]
    ritual_washing TEXT[], -- [1st, 2nd, 3rd]
    janaza_prayer_location TEXT[], -- [1st, 2nd, 3rd]
    choice_by_another TEXT[], -- [1st, 2nd, 3rd],
    favorite_washers TEXT[] NOT NULL DEFAULT '{}',
    favorite_funeral_companies TEXT[] NOT NULL DEFAULT  '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fcm_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    device_id VARCHAR(255), -- Unique device identifier (e.g., device UUID, IMEI, etc.)
    device_type VARCHAR(50), -- 'android', 'ios', 'web', 'desktop'
    device_name VARCHAR(255), -- User-friendly device name (e.g., "iPhone 14", "Samsung Galaxy")
    app_version VARCHAR(50), -- App version on this device
    os_version VARCHAR(50), -- Operating system version
    is_active BOOLEAN DEFAULT TRUE, -- Whether this token is still valid
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Last time this token was used
    language language NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, token),
    UNIQUE(user_id, device_id)
);
CREATE TABLE washer_profiles (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255),
    image TEXT,
    fullname VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    region VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    status entity_status DEFAULT 'active',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone_number VARCHAR(20) NOT NULL,
    secondary_phone_numbers TEXT[],
    gender user_gender NOT NULL,
    attachment_path TEXT,
    is_validated_identity BOOLEAN DEFAULT FALSE,
    is_validated_certification BOOLEAN DEFAULT FALSE,
    witnesses JSONB, -- Array of {name: string, phoneNumber: string}
    total_reviews int NOT NULL DEFAULT 0,
    average_reviews numeric(3,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

CREATE TABLE funeral_company_profiles (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image TEXT,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    website VARCHAR(255),
    secondary_phone_numbers TEXT[],
    operating_hours TEXT,
    services TEXT,
    available BOOLEAN DEFAULT TRUE,
    region VARCHAR(255) NOT NULL,
    status entity_status DEFAULT 'active',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
     attachment_path TEXT,
    is_validated_identity BOOLEAN DEFAULT FALSE,
    is_validated_certification BOOLEAN DEFAULT FALSE,
    witnesses JSONB, -- Array of {name: string, phoneNumber: string}
   total_reviews int NOT NULL DEFAULT 0,
 average_reviews numeric(3,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);


CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entity_id UUID NOT NULL, -- References washer_profiles or funeral_company_profiles
    entity_type VARCHAR(20) NOT NULL, -- 'washer' or 'funeral_company'
    full_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5),
    comment TEXT,
    contact VARCHAR(255),
    questions JSONB, -- Record<string, boolean>
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(reviewer_id, entity_id, entity_type)
);




CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL,
    data JSONB, -- Additional notification data
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_roles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);