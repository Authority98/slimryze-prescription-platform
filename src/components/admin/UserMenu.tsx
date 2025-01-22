import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Building2
} from 'lucide-react';

interface Props {
  userName: string;
  clinicName: string;
}

export function UserMenu({ userName, clinicName }: Props) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-5 h-auto hover:bg-transparent transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2.5 rounded-full shadow-lg">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 h-2.5 w-2.5 rounded-full border-2 border-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">{userName}</p>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Building2 className="h-3 w-3" />
                <span>{clinicName}</span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-1 transition-transform duration-200 group-hover:rotate-180" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <div className="space-y-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-gray-700 hover:text-gray-900"
            onClick={() => navigate('/admin/profile')}
          >
            <User className="h-4 w-4" />
            Edit Practitioner Profile
          </Button>
          
          <div className="h-px bg-gray-100 my-2" />
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
} 