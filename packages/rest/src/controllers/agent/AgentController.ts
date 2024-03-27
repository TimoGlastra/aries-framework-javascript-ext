import type { AgentInfo } from './AgentControllerTypes'

import { Controller, Example, Get, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithRootAgent } from '../../authentication'

import { agentInfoExample } from './AgentControllerExamples'

@Tags('Agent')
@Route('/agent')
@Security('tenants', ['default'])
@injectable()
export class AgentController extends Controller {
  /**
   * Retrieve basic agent information
   */
  @Get('/')
  @Example(agentInfoExample)
  public async getAgentInfo(@Request() request: RequestWithRootAgent): Promise<AgentInfo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { agentDependencies, walletConfig, logger, ...config } = request.user.agent.config.toJSON()

    return {
      config,
      isInitialized: request.user.agent.isInitialized,
    }
  }
}
