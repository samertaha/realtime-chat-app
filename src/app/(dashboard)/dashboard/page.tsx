import Button from "@/components/ui/Button"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

interface pageProps {}

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  return <h6>{JSON.stringify(session)}</h6>
}

export default page
