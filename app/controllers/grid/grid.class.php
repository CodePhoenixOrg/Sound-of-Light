<?php
namespace Phox\Controllers;

class Grid extends \Phink\MVC\TPartialController {

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
        $this->index = $this->request->getQueryArguments('pagenum');
        $this->pageCount = ($this->pageCount) ? $this->pageCount :  $this->request->getQueryArguments('pagecount');
        $cmd = $this->model->getArtistRange();
        
        $cmd->addSelectLimit($this->index, $this->pageCount);
        
        $stmt = $cmd->querySelect();
        $range = array();
        while($row = $stmt->fetch()) {
            array_push($range, $row[0]);
        }
        
        $this->cmd = $this->model->getArtistAlbumTitle($range);
    }

    public function getData($pagecount, $pagenum) {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, $pagecount);
        $this->response->setData('grid', $this->data);
    }
    
}
