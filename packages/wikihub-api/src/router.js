import {Router} from 'express'
import * as EventController from './controllers/event'
import * as GroupController from './controllers/group'
import * as MemberController from './controllers/member'
import * as OfferController from './controllers/offer'

const router = new Router()

router.route('/events').get(EventController.getAll)
router.route('/event/types').get(EventController.getAllTypes)
router.route('/groups').get(GroupController.getAll)
router.route('/members').get(MemberController.getAll)
router.route('/members/:id').get(MemberController.getById)
router.route('/offers').get(OfferController.getAll)
router.route('/offers/new').post(OfferController.create)
router.route('/offers/:id').get(OfferController.getById)
router.route('/offers/:id').delete(OfferController.deleteById)
router.route('/offers/:id').patch(OfferController.updateById)

export default router
