<?php
namespace Phink\Web\UI\Widget\Pager;

class TPager extends \Phink\Web\UI\TControl
{

    protected $pageCount;
    protected $caption;
    protected $currentPage;
    protected $pageNum;
    protected $statement;
    protected $onclick;
    protected $script;
    protected $pagerJS;
    protected $for;

    public function setStatement($value)
    {
        $this->statement = $value;
    }

    public function setCaption($value)
    {
        $this->caption = $value;
    }

    public function setPageCount($value)
    {
        $this->pageCount = $value;
    }
    
    public function setCurrentPage($value)
    {
        $this->currentPage = $value;
    }
    
    public function setPageNum($value)
    {
        $this->pageNum = $value;
    }
    
    public function setOnclick($value)
    {
        $this->onclick = $value;
    }
    
    public function setFor($value)
    {
        $this->for = $value;
    }


    public function init()
    {
        $forControl = $this->parent->getChildById($this->for);
    
        $this->pageNum = (int) (!$this->pageNum) ? 1 : $this->pageNum;
        
        $this->pageCount = ($forControl) ? $forControl->getRowCount(): $this->pageNum;
    
        $path = ROOT_PATH . \Phink\Core\TRegistry::classPath('TPager');
        $this->pagerJS = file_get_contents($path . 'pager.js', FILE_USE_INCLUDE_PATH);
        $this->pagerJS = str_replace('<% pageCount %>', $this->pageCount, $this->pagerJS);
        $this->pagerJS = str_replace('<% pageNum %>', $this->pageNum, $this->pagerJS);
        $this->pagerJS = str_replace('<% id %>', $this->id, $this->pagerJS);
        $this->pagerJS = str_replace('<% onclick %>', $this->onclick, $this->pagerJS);
        
        $this->script = TMP_DIR . DIRECTORY_SEPARATOR . str_replace(DIRECTORY_SEPARATOR, '_', $path . 'pager.js');

        file_put_contents($this->script, $this->pagerJS);
        $this->response->addScript($this->script);
    }	public function createObjects() {	}	public function declareObjects() {	}	public function afterBindingObjects() {	}	public function displayHtml() {?><!--script type='text/javascript' src='<?php echo $this->script; ?>' ></script-->
<table border='0' cellspacing='0' cellpadding='0'>
<tr class="Row0">
    <td width='100%' align='center' valign='bottom'>
        <a onclick='TPager.leftLimit()' href='javascript:void(0)'><img src='<?php echo \Phink\Web\TWebApplication::imagePath(); ?>/scroll/leftLimit_0.gif' valign='top' border='0'></a>
        <a onclick='TPager.fastLeft()' href='javascript:void(0)'><img src='<?php echo \Phink\Web\TWebApplication::imagePath(); ?>/scroll/fastLeft_0.gif' valign='top' border='0'></a>
        <?php echo $this->pageCount; ?> <?php echo $this->caption; ?> - Page <span id='<?php echo $this->id; ?>pageNum' ><?php echo $this->pageNum; ?></span>
        <a onclick='TPager.fastRight()' href='javascript:void(0)'><img src='<?php echo \Phink\Web\TWebApplication::imagePath(); ?>/scroll/fastRight_0.gif' valign='top' border='0'></a>
        <a onclick='TPager.rightLimit()' href='javascript:void(0)'><img src='<?php echo \Phink\Web\TWebApplication::imagePath(); ?>/scroll/rightLimit_0.gif' valign='top' border='0'></a>
    </td>
</tr>
</table>
<?php	}}