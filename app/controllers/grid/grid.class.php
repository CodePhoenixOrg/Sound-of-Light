<?php
namespace SoL\Controllers;

class Grid extends \Phink\MVC\TPartialController
{

    protected $stmt = NULL;
    protected $cmd = NULL;
    protected $items = array();
    protected $cn = NULL;
    protected $pager = NULL;
    protected $onclick = NULL;
    protected $anchor = NULL;
    protected $pageCount = 0;
    protected $index = 1;
    protected $letter = '';
    public $accordion0 = NULL;

    public function setPageCount($value)
    {
        $this->pageCount = $value;
    }

    public function setLetter($value)
    {
        $this->letter = $value;
    }

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
    
    public function setOnclick($value)
    {
        $this->onclick = $value;
    }
    
    public function showArtistsByLetter($letter) 
    {
        $this->cmd = $this->model->getArtistAlbumTitleByLetter($letter);
    }

    public function showAlbumsByLetter($letter) 
    {
        $this->cmd = $this->model->getAlbumTitleByLetter($letter);
    }
    
    public function showAlbumsByDate($year) 
    {
        $this->cmd = $this->model->getAlbumTitleByYear($year);
    }
 
    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->cmd, $pagecount);
        $this->response->setData('grid', $this->data);
    }
    
}
