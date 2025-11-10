interface MyGeoBtnProps {
  isLoading: boolean
  handleGetLocation: () => void
}
export const MyGeoBtn = ({ isLoading, handleGetLocation }: MyGeoBtnProps) => {
  return (
    <button
      onClick={handleGetLocation}
      disabled={isLoading}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '6px 10px',
        background: '#fff',
        borderRadius: '6px',
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
    >
      {isLoading ? 'Loading...' : 'My geolocation'}
    </button>
  )
}