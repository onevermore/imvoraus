import { Profile } from '@/components/screens/profile/Profile'

import { NextPageAuth } from '@/shared/types/auth.types'

const ProfilePage: NextPageAuth = () => {
	return <Profile />
}
ProfilePage.isUser = true

export default ProfilePage
