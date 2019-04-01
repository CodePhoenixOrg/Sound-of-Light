<?php
namespace SoL\Controllers;

class AbcArtists extends \Phink\MVC\TPartialController {

    protected $stmt = null;
    protected $anchor = '';

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
 
    public function init()
    {
        $this->stmt = $this->model->getLettrines();
    }

    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, 1);
        $this->response->setData('abc', $this->data);
    }
    
}
