-- Create death_declarations table
CREATE TABLE death_declarations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    declared_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    matched_uid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_death DATE NOT NULL,
    place_of_death TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('rejected', 'pending', 'approved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_death_declarations_status ON death_declarations(status);
CREATE INDEX idx_death_declarations_matched_uid ON death_declarations(matched_uid);
CREATE INDEX idx_death_declarations_declared_by ON death_declarations(declared_by);

-- Add RLS (Row Level Security) policies
ALTER TABLE death_declarations ENABLE ROW LEVEL SECURITY;

-- Policy for admins to read all death declarations
CREATE POLICY "Admins can read all death declarations" ON death_declarations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND user_roles.role IN ('admin', 'super_admin')
        )
    );

-- Policy for admins to update death declarations
CREATE POLICY "Admins can update death declarations" ON death_declarations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_roles.user_id = auth.uid() 
            AND user_roles.role IN ('admin', 'super_admin')
        )
    );

-- Policy for users to insert their own death declarations
CREATE POLICY "Users can insert their own death declarations" ON death_declarations
    FOR INSERT WITH CHECK (
        declared_by = auth.uid()
    );

-- Policy for users to read their own death declarations
CREATE POLICY "Users can read their own death declarations" ON death_declarations
    FOR SELECT USING (
        declared_by = auth.uid() OR matched_uid = auth.uid()
    );
