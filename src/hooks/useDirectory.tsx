import { defaultMenuItem, DirectoryMenuItem, directoryMenuState } from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { communityState, defaultCommunity } from '@/atoms/communitiesAtom';
import { FaReddit } from "react-icons/fa";
import { User } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const useDirectory = () => {
    const router = useRouter();
      const [user] = useAuthState(auth);
    const communityStateValue = useRecoilValue(communityState);
    const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);

    
    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState((prev) => ({
            ...prev,
            selectedMenuItem: menuItem,
        }));
        router.push(menuItem.link);
        if(directoryState.isOpen) {
            toggleMenuOpen()
        }
    }
    
    const toggleMenuOpen = () => {
        setDirectoryState((prev) => ({
            ...prev,
            isOpen: !directoryState.isOpen,
        }))
    }

    useEffect(() => {
        const { currentCommunity } = communityStateValue;
        if(currentCommunity) {
            setDirectoryState((prev) => ({
                ...prev,
                selectedMenuItem: { 
                    displayText: `r/${currentCommunity.id}`,
                    link: `/r/${currentCommunity.id}`,
                    imageURL: currentCommunity.imageURL,
                    icon: FaReddit,
                    iconColor: "blue.500",
            }
            }))
        }

    }, [communityStateValue.currentCommunity])

    return { directoryState, toggleMenuOpen, onSelectMenuItem };
}

export default useDirectory;