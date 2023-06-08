import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'

import { NextPageAuth } from '@/shared/types/auth.types'

const AdminPanel: NextPageAuth = () => {
	return (
		<div>
			<AdminNavigation />
		</div>
	)
}

AdminPanel.isAdmin = true

export default AdminPanel
