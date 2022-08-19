import { FC } from 'react'
import ReduxToastLib from 'react-redux-toastr'

export const ReduxToast: FC = () => {
	return (
		<ReduxToastLib
			newestOnTop={false}
			preventDuplicates={true}
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn="fadeIn"
			transitionOut="fadeOut"
		/>
	)
}
