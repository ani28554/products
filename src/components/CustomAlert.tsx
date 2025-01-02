
interface CustomAlertProps {
  text: string;
  activated: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ text, activated }) => {
 

  return (
    <>
      <div className="w-full flex h-16 justify-center items-center">
        {activated && (
          <div className="bg-green-800 text-white flex justify-center text-xl rounded-md items-center h-full w-2/3 bg-opacity-60">
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomAlert;
