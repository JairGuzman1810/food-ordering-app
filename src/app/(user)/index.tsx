import { Redirect } from "expo-router";
//Redirect to menu page
export default function TabIndex() {
  return <Redirect href={"/(user)/menu/"} />;
}
