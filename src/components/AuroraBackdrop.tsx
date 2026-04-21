/** Big soft color blobs — pure CSS, GPU-friendly */
export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
      <div className="aurora-blob aurora-blob-a absolute -left-[20%] top-[10%] size-[55vmin] rounded-full opacity-70 blur-[80px]" />
      <div className="aurora-blob aurora-blob-b absolute -right-[15%] top-[35%] size-[45vmin] rounded-full opacity-60 blur-[70px]" />
      <div className="aurora-blob aurora-blob-c absolute bottom-[5%] left-[25%] size-[40vmin] rounded-full opacity-50 blur-[65px]" />
    </div>
  )
}
