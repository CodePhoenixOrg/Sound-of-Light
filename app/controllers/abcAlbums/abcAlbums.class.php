<?php
namespace SoL\Controllers;

class Abc extends \Phink\MVC\TPartialController {

    protected $stmt = NULL;
    protected $cmd = NULL;
    protected $items = array();
    protected $cn = NULL;
    protected $pager = NULL;
    protected $onclick = NULL;
    protected $anchor = NULL;
    protected $pageCount = 0;
    protected $index = 1;
    public $accordion0 = NULL;

    public function setPageCount($value) {
        $this->pageCount = $value;
    }

    public function setAnchor($value) {
        $this->anchor = $value;
    }
    
    public function setOnclick($value) {
        $this->onclick = $value;
    }
    
    public function init() {
//        \Phink\Log\TLog::debug('Je passe par la !');
        
        $this->cmd = $this->model->getLettrines();
    }

    public function getData($pagecount, $pagenum) {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, 1);
        $this->response->setData('abc', $this->data);
    }
    
}
