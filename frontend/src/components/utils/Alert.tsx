// components/Alert.tsx
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type AlertType = "success" | "error" | "warning" | "info" | "question";

interface AlertOptions {
  title: string;
  text?: string;
  icon?: AlertType;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Alert = ({
  title,
  text,
  icon = "info",
  confirmButtonText = "OK",
  showCancelButton = false,
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
}: AlertOptions) => {
  return MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm?.();
    } else if (result.isDismissed) {
      onCancel?.();
    }
  });
};

export default Alert;
