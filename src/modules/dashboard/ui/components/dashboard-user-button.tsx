"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();

  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return(
      <Drawer>
        <DrawerTrigger className="group rounded-xl border border-border/20 px-4 py-3 w-full flex items-center justify-between bg-muted/40 hover:bg-muted/30 transition-colors duration-200 shadow-sm overflow-hidden gap-x-2">

        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {data.user.image ? (
            <Avatar className="w-10 h-10 ring-2 ring-primary/50 shadow-md">
              <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name || data.user.email || "user"}
              variant="initials"
              className="size-10 rounded-full ring-2 ring-primary/50 shadow-sm"
            />
          )}

          <div className="flex flex-col gap-0.5 text-left flex-1 overflow-hidden min-w-0">
            <p className="text-sm w-full truncate">
              {data.user.name}
            </p>
            <p className="text-xs w-full  truncate">
              {data.user.email}
            </p>
          </div>
        </div>

        <ChevronDownIcon className="size-4 shrink-0" />

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => {

              }}
            >
              Billing
              <LogOutIcon className="size-4 text-destructive ml-auto" />
            </Button>


            <Button
              variant="outline"
              onClick={onLogout}
            >
              Logout
              <LogOutIcon className="size-4 text-destructive ml-auto" />
            </Button>



          </DrawerFooter>
        </DrawerContent>
        

        </DrawerTrigger>
      </Drawer>
    )
  }




  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group rounded-xl border border-border/20 px-4 py-3 w-full flex items-center justify-between bg-muted/40 hover:bg-muted/30 transition-colors duration-200 shadow-sm overflow-hidden gap-x-2">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {data.user.image ? (
            <Avatar className="w-10 h-10 ring-2 ring-primary/50 shadow-md">
              <AvatarImage src={data.user.image} alt={data.user.name || "User"} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name || data.user.email || "user"}
              variant="initials"
              className="size-10 rounded-full ring-2 ring-primary/50 shadow-sm"
            />
          )}

          <div className="flex flex-col overflow-hidden min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {data.user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {data.user.email}
            </p>
          </div>
        </div>

        <ChevronDownIcon className="size-4 text-muted-foreground ml-2 transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="right"
        className="w-72 bg-popover border border-border/20 shadow-xl rounded-xl p-2 z-50"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col px-2 py-1">
            <span className="font-semibold text-sm text-foreground truncate">
              {data.user.name}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted cursor-pointer text-sm">
          Billing
          <CreditCardIcon className="size-4 text-muted-foreground ml-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive cursor-pointer text-sm"
        >
          Logout
          <LogOutIcon className="size-4 text-destructive ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
