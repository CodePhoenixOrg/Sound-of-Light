<?php
namespace SoL\Controllers;

class Collection extends \Phink\MVC\TPartialController
{

    protected $stmt = null;
    protected $items = [];
    protected $cn = null;
    protected $pager = null;
    protected $onclick = null;
    protected $anchor = null;
    protected $pageCount = 0;
    protected $index = 1;
    protected $letter = '';
    public $list0 = null;

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
        $this->stmt = $this->model->getArtistAlbumTitleByLetter($letter);
    }

    public function showAlbumsByLetter($letter) 
    {
        $this->stmt = $this->model->getAlbumTitleByLetter($letter);
    }
    
    public function showAlbumsByDate($year) 
    {
        $this->stmt = $this->model->getAlbumTitleByYear($year);
    }
 
    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, $pagecount);
        $this->response->setData('collection', $this->data);
    }
    
}
