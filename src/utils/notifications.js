import { toast } from "react-toastify";
export  const pushErrorNotification = (msg) => {
  toast(msg, { type: "error" });
};
