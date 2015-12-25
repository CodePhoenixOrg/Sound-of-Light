<?php
namespace Detroit\Controllers;

class Grid extends \Phoenix\Web\UI\TControl {

    protected $stmt = NULL;
    protected $cmd = NULL;
    protected $cols = array();
    protected $dataGrid = NULL;
    protected $cn = NULL;
    protected $pager = NULL;
    protected $onclick = NULL;
    protected $anchor = NULL;
    protected $pageCount = 0;
    protected $index = 1;

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
//        \Phoenix\Log\TLog::debug('Je passe par la !');
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

    public function getData() {
        $id = $this->getViewName();
        $this->data = \Phoenix\Data\UI\TDataGrid::getGridData($id, $this->cmd, $this->pageCount);
        $this->response->setData('grid', $this->data);
    }
    	public function createObjects() {\Phoenix\TAutoloader::import("TDataGrid");$this->cols[0] = new \Phoenix\Data\UI\TDataColumn($this); $this->cols[0]->setId("cols"); $this->cols[1] = new \Phoenix\Data\UI\TDataColumn($this); $this->cols[1]->setId("cols"); $this->cols[2] = new \Phoenix\Data\UI\TDataColumn($this); $this->cols[2]->setId("cols"); $this->cols[3] = new \Phoenix\Data\UI\TDataColumn($this); $this->cols[3]->setId("cols"); $this->cols[4] = new \Phoenix\Data\UI\TDataColumn($this); $this->cols[4]->setId("cols"); $this->cols[5] = new \Phoenix\Data\UI\TDataColumn($this); $this->cols[5]->setId("cols"); $this->setId("grid"); $this->dataGrid = new \Phoenix\Data\UI\TDataGrid($this); $this->dataGrid->setId("dataGrid"); 	}	public function declareObjects() {$this->cols[0]->setName("ArtistId"); $this->cols[0]->setEnabled("false"); $this->cols[1]->setName("Artist"); $this->cols[1]->setContent("@artistItem.phtml"); $this->cols[1]->setEnabled("true"); $this->cols[1]->setEvent("href#showArtist(Id)"); $this->cols[2]->setName("AlbumId"); $this->cols[2]->setEnabled("false"); $this->cols[3]->setName("Album"); $this->cols[3]->setContent("@albumItem.phtml"); $this->cols[3]->setEnabled("true"); $this->cols[3]->setEvent("href#showAlbum(Id)"); $this->cols[4]->setName("TitleId"); $this->cols[4]->setEnabled("false"); $this->cols[5]->setName("Title"); $this->cols[5]->setContent("@titleItem.phtml"); $this->cols[5]->setEnabled("true"); $this->cols[5]->setEvent("href#showTitle(Id)"); $this->dataGrid->setPattern("accordion"); $this->dataGrid->setPivot("true"); $this->dataGrid->setCommand($this->cmd); $this->dataGrid->setColumns($this->cols); $this->dataGrid->setRowCount($this->pageCount); $this->dataGrid->setPageNum($this->index); 	}	public function displayHtml() {?><?php $this->dataGrid->render(); ?>
<?php	}}