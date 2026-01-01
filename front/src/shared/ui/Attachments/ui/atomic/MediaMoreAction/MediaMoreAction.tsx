import { MoreButton } from '../../../../MoreButton';
import { DownloadButton } from '../../../../DownloadButton';

interface MediaMoreActionPops {
  className?: string
  fileUrl: string
  filename?: string
  publicId: string
}
export const MediaMoreAction = ({
  className,
  fileUrl,
  filename,
  publicId
}: MediaMoreActionPops) => {
  return (
    <MoreButton
      className={className}
      contentWrapperClass="w-fit min-w-[200px] p-2 bg-white rounded-sm shadow-md"
      content={(
        <ul className="cursor-pointer">
          <li>
            <DownloadButton url={fileUrl} filename={filename} publicId={publicId}/>
          </li>
        </ul>
      )}
    />
  )
}