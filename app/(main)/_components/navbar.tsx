"use client"

import {useParams} from 'next/navigation'
import {useQuery} from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { MenuIcon } from 'lucide-react';
import { Menu } from "./menu";
import {Title} from './title';
import Banner from './banner';
import Publish from './publish';

interface NavbarProps {
    isCollapsed: boolean,
    onResetWidth: ()=> void
}

const Navbar = ({
    isCollapsed,
    onResetWidth
}:NavbarProps) => {
    const params = useParams()

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    })

    if (document === undefined) {
        return (
          <nav className="sm:bg-secondary px-3 py-2 w-full flex items-center justify-between">
            <Title.Skeleton />
            <div className="flex items-center gap-x-2">
              <Menu.Skeleton />
            </div>
          </nav>
        );
      }

    if (document === null) {
        return null;
    }  

  return (
    <>
     <nav className='bg-secondary dark:bg-[#020817] overflow-hidden px-3 py-2 w-full flex items-center gap-x-4'>
        {isCollapsed && (
            <MenuIcon
              role='button'
              onClick={onResetWidth}
              className='h-6 w-6 text-muted-foreground'
            />
        )}
        <div className='flex justify-between items-center w-full'>
            <Title initialData={document} />
            <div className='flex items-center gap-x-2'>
                <Publish initialData={document}/>
               <Menu documentId={document._id}/>
            </div>
        </div>
     </nav>
     {document.isAchived && (
       <Banner documentId={document._id}/>
     )}
    </>
  )
}

export default Navbar