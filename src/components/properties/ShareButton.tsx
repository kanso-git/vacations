'use client'
import { MdOutlineShare } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  FacebookIcon,
  FacebookShareButton,
  EmailIcon,
  EmailShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

export default function ShareButton() {
  const shareUrl = ''
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type='button' className='w-14 h-14' variant='outline'>
          <MdOutlineShare size={28} className=''></MdOutlineShare>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-50' side='top'>
        <div className='flex items-center justify-center gap-2'>
          <FacebookShareButton
            url={shareUrl}
            className='Demo__some-network__share-button'
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <EmailShareButton
            url={shareUrl}
            className='Demo__some-network__share-button'
          >
            <EmailIcon size={32} round />
          </EmailShareButton>

          <TwitterShareButton
            url={shareUrl}
            className='Demo__some-network__share-button'
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}
