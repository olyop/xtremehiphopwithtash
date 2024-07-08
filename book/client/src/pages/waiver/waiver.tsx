import { FC, Fragment, createElement } from "react";

import PageWithHeader from "../page-with-header";

const WaiverPage: FC = () => (
	<PageWithHeader
		title={
			<Fragment>
				Xtreme Hip-Hop Step Class
				<br />
				Participant Waiver and Authorisation
			</Fragment>
		}
		contentClassName="flex flex-col gap-6 px-8"
	>
		<p>
			I, the undersigned participant, acknowledge that I am voluntarily participating in the Xtreme Hip-Hop Step Aerobic
			class offered by Natasha Brown, Xtreme Hip-Hop with Tash. I understand that this class involves physical
			activities, including aerobic exercises, step exercises and other fitness activities.
		</p>
		<p>
			I acknowledge that participating in physical activities carries inherent risks, including the risk of personal
			injury.
		</p>
		<p>
			I understand that symptoms such as feeling faint, dizzy, nauseated or experiencing pain or discomfort may be
			associated with participating in this fitness activity. I acknowledge that I am free to refuse to participate at
			any time during the class.
		</p>
		<p>
			I confirm that I am in good health and physical condition and if at any time, I feel that the activity is unsafe
			for me, I will stop participating.
		</p>
		<p>
			I authorise Natasha Brown to provide first aid or seek medical support on my behalf in the case of an emergency.
		</p>
		<p>
			In consideration for being allowed to participate in the fitness class, I hereby release, waive, discharge and any
			claims against XtremehiphopwithTash from any and all liability, claims, demands, actions or causes of action
			arising out of or related to any injury or discomfort that may occur to me while participating in the class.
		</p>
		<p>
			I understand that XtremehiphopwithTash is not responsible for any personal property that is lost, damaged or
			stolen while I am attending or participating in fitness class.
		</p>
		<p>
			I certify that I am physically fit to participate in the class and have not been advised otherwise by a qualified
			medical professional. I understand that it is my responsibility to consult with a physician prior to and regarding
			my participation in the class.
		</p>
	</PageWithHeader>
);

export default WaiverPage;
