import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface GeneratedAvatarProps {
     seed: string;
     // size?: number;
     className?: string;
     variant: 'bottsNeutral' | 'initials' ;
     }

export const GeneratedAvatar = ({
     seed,
     className,
     variant,
    
}: GeneratedAvatarProps) => {
     let avatar;

     if (variant === 'bottsNeutral') {
          avatar = createAvatar(botttsNeutral, {
               seed,
          });
     } else {  
          avatar = createAvatar(initials, {
               seed,
               fontWeight: 500,
               fontSize: 42,
          });
     }
     return (
          <Avatar className={cn(className)}>
               <AvatarImage src={avatar.toDataUri()} alt= "Avatar"/>
               <AvatarFallback>{seed.charAt(0).toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
     )
};