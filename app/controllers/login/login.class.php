<?php
namespace Detroit\Controllers;

/**
 * Description of logme
 *
 * @author david
 */
class Login extends \Phoenix\MVC\TController {
    //put your code here
    
    private $_login = '';
    private $_password = '';
    
    public function init() {
        
    }
       
    public function logout() {
        session_destroy();
        session_start();
        
        $this->response->setMessage("logout");
    }
    
    public function authenticate() {
        $result = FALSE;
        $this->_login = $this->request->getQueryArguments('login');
        $this->_password = $this->request->getQueryArguments('password');
        $container = $this->request->getQueryArguments('container');
        
        $token = '';
        if($this->_login && $this->_password) {
            $token = $this->model->getPermission($this->_login, $this->_password);
        }
        $result = ($token) ? 1 : 0;
            
        \Phoenix\Log\TLog::debug('token : ' . $token);

        if($result) {
            \Phoenix\Log\TLog::debug('result OK');
            
            $this->request->addSubRequest('master', SERVER_ROOT, MASTER_PAGE . '?token=!' . $token);
            $this->request->addSubRequest('page', SERVER_ROOT, HOME_PAGE . '?token=!' . $token);
            $result = $this->request->execSubRequests();
            
            $master = $result['master'];
            $page = $result['page'];        

            $masterHtml = ($container && $master['html']) ? $master['html'] : '';
            $pageHtml = ($page['html']) ? $page['html'] : '';

            $this->response->setData('master', $masterHtml);
            $this->response->setData('container', $container);
            $this->response->setData('page', $pageHtml);
            $this->response->setToken($token);
//            $this->response->setData('masterHeader', $master['code'] . ';' . $master['header']);
//            $this->response->setData('pageHeader', $page['code'] . ';' . $page['header']);
            $this->response->setReturn(200);
        } else {
            $this->response->setToken($token);
            $this->response->setReturn(403);
        }
    }
}
