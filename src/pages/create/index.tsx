import LeftBar from "@/components/CreatePitch/LeftBar";
import Pitch from "@/components/CreatePitch/Pitch";
import RightBar from "@/components/CreatePitch/RightBar";
import { CreatePitchProvider } from "@/contexts/CreatePitch/CreatePitchContext";
import { generateFormationFromString } from "@/helpers/generateFormation";
import { AppLayout } from "@/layouts/AppLayout";

const CreatePitch = () => {
  return (
    <AppLayout>
      <CreatePitchProvider>
        <div className="grid px-8 grid-cols-1 sm:grid-cols-8 md:grid-cols-12 gap-4">
          {/* Left  */}
          <LeftBar />
          {/* center  */}
          <Pitch />
          {/* Right  */}
          <RightBar />
        </div>
      </CreatePitchProvider>
    </AppLayout>
  );
};

export default CreatePitch;
