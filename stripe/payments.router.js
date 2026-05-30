
import { Router } from 'express'
import { stripe } from './stripe.client.js'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()