import express, { Application, Request, Response, Router } from 'express'
import { userHandler, testHandler } from '../Controller/user.controller'


function routes(app: Application) {

  console.log('Routes has Initiated')
  
  app.get('/api/user', userHandler)

  app.get('/test', testHandler)
}


export default routes