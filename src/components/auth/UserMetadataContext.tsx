import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../../lib/supabaseClient';

interface UserMetadata {
  full_name: string;
  clinic_name: string;
  [key: string]: any;
}

interface UserMetadataContextType {
  metadata: UserMetadata;
  updateMetadata: (newMetadata: Partial<UserMetadata>) => Promise<void>;
}

const UserMetadataContext = createContext<UserMetadataContextType>({
  metadata: { full_name: '', clinic_name: '' },
  updateMetadata: async () => {},
});

export function UserMetadataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [metadata, setMetadata] = useState<UserMetadata>({ full_name: '', clinic_name: '' });

  useEffect(() => {
    if (user) {
      setMetadata(user.user_metadata);
    }
  }, [user]);

  const updateMetadata = async (newMetadata: Partial<UserMetadata>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: newMetadata
      });

      if (error) throw error;

      if (data.user) {
        setMetadata(data.user.user_metadata);
      }
    } catch (error) {
      console.error('Error updating user metadata:', error);
      throw error;
    }
  };

  return (
    <UserMetadataContext.Provider value={{ metadata, updateMetadata }}>
      {children}
    </UserMetadataContext.Provider>
  );
}

export const useUserMetadata = () => useContext(UserMetadataContext); 