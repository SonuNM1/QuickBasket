import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../util/AxiosToastError";
import Axios from "../util/Axios";
import SummaryApi from "../common/SummaryAPI";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";


const ResetPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.newPassword !== data.confirmPassword){
      toast.error('Password and confirm password must be same!')
      return 
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/login")

        setData({
          email: "",
          newPassword: "",
          confirmPassword: ''
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter your new password!</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>

          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password : </label>

              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 ">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full outline-none"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                />

                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password : </label>

              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password"
                  className="w-full outline-none"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                />

                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
            </div>
          </div>


          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700 " : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold  text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;


