import { buildProviderModule, container } from '../ioc/inversify.config'

/* REST Controllers */
import '../../routes/v1/resolveStudio/resolveStudio.controller'

/* Services */
import '../../services/resolveStudio/resolveStudioService'

container.load(buildProviderModule())
