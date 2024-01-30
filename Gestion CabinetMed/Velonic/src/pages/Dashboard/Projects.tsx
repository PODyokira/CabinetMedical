import { Table } from 'react-bootstrap'

// components
import { CustomCardPortlet } from '@/components'

// data
import { projects } from './data'

import {RendezVTables} from '../ui/tables/RendezVTable/RendezV'

const Projects = () => {
	return (
		<CustomCardPortlet cardTitle="Les Rendez Vous" titleClass="header-title">
			<RendezVTables/>
		</CustomCardPortlet>
	)
}

export default Projects
