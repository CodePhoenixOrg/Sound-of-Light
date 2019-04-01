<?php
namespace SoL\Controllers;

class AbcYears extends \Phink\MVC\TPartialController {

    protected $stmt = NULL;
    protected $anchor = '';

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
 
    public function init() 
    {
        $this->stmt = $this->model->getYears();
    }

    public function getData($pagecount, $pagenum)
    {
        $id = $this->getViewName();
        $this->data = \Phink\Web\UI\Widget\Plugin\TPlugin::getGridData($id, $this->stmt, 1);
        $this->response->setData('abc', $this->data);
    }
    
}
