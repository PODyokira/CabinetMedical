import { Table } from 'react-bootstrap'

// components
import { CustomCardPortlet } from '@/components'

// data
import { projects } from './data'

import {PatTables} from '../ui/tables/PatientsTable/PatTables'

const Projects = () => {
	return (
		<CustomCardPortlet cardTitle="Les Patientes" titleClass="header-title">
			<PatTables/>
		</CustomCardPortlet>
	)
}

export default Projects
