import { useAppSelector } from "../hooks/redux";
import moment from "moment";

export default function AboutUser() {
  const { user, isAuth } = useAppSelector((store) => store.posts);

  return isAuth ? (
    <div className="mt-20 px-3 flex flex-col gap-2">
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <p>User name:</p>
          <p>User mail:</p>
          <p>Profile creation date:</p>
          <p>Profile update date:</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>{user.user.fullName}</p>
          <p>{user.user.email}</p>
          <p>
            {moment(user.user.createdAt).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </p>
          <p>
            {moment(user.user.updatedAt).format(
              "dddd, MMMM Do YYYY, h:mm:ss a"
            )}
          </p>
        </div>
      </div>
      {user.user.isActivated && (
        <p className="text-green-600">Mail confirmed</p>
      )}
      {!user.user.isActivated && (
        <p className="text-red-600">
          Mail not confirmed. To confirm, follow the link in the email.
        </p>
      )}
    </div>
  ) : (
    <></>
  );
}
