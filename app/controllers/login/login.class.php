<?php
namespace SoL\Controllers;

/**
 * Description of logme
 *
 * @author david
 */
class Login extends \Phink\MVC\TController {
    //put your code here
    
    private $_login = '';
    private $_password = '';
    protected $headers = '';
    
    public function init() {
        foreach($_SERVER as $key => $value) {
            if (substr($key, 0, 5) == 'HTTP_') 
            { 
                $this->headers .= "$key = $value<br />";
//                $this->headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value; 
            } 
        }
    }
       
    public function logout()
    {
        session_destroy();
        session_start();
        
        $this->response->setMessage("logout");
    }
    
    public function authenticate($login, $password, $container)
    {
        $result = FALSE;
        
        $this->_login = $login;
        $this->_password = $password;
        
        $token = '';
        if($this->_login && $this->_password) {
            $token = $this->model->getPermission($this->_login, $this->_password);
        }
        $result = ($token) ? 1 : 0;
            
        if($result) {
            
            $this->request->addViewSubRequest('master', SERVER_ROOT . MASTER_PAGE, ['token' => $token]);
            $this->request->addViewSubRequest('page', SERVER_ROOT . HOME_PAGE, ['token' => $token]);
            
            try {
                $result = $this->request->execSubRequests();
                $master = $result['master'];
                $page = $result['page'];        

                $masterHtml = ($container && $master['html']) ? $master['html'] : '';
                $pageHtml = ($page['html']) ? $page['html'] : '';

                $this->response->setData('master', $masterHtml);
                $this->response->setData('container', $container);
                $this->response->setData('page', $pageHtml);
                $this->response->setToken($token);
                $this->response->setReturn(200);
            } catch (\Exception $ex) {
                $this->response->setToken($token);
                $this->response->setReturn(202);
            }
            
        } else {
            $this->response->setToken($token);
            $this->response->setReturn(403);
        }
    }
}