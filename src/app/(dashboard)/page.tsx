import Recordings from "@/components/recordings"
import ScreenRecorder from "@/components/screen-recorder"

const Home = async () => {
  return (
    <div className="h-screen flex flex-col items-center p-4">
      <ScreenRecorder />
      {/* <Recordings /> */}
    </div>
  )
}
export default Home;