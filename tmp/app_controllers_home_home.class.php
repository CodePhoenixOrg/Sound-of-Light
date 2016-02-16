<?php
namespace Detroit\Controllers;

/**
 * Description of logme
 *
 * @author david
 */

 class Home extends \Phoenix\Web\UI\TControl {
    //put your code here

    protected $dummy;
    protected $grid0;

	public function createObjects() {\Phoenix\TAutoloader::import("dummy");\Phoenix\TAutoloader::import("grid");\Phoenix\TAutoloader::import("TPager");$this->setId("home"); $this->dummy = new \Something\Dummy($this); $this->dummy->setId("dummy"); $this->grid0 = new \Detroit\Controllers\Grid($this); $this->grid0->setId("grid0"); $this->pager = new \Phoenix\Web\UI\TPager($this); $this->pager->setId("pager"); 	}	public function declareObjects() {$this->grid0->setAnchor("#grid"); $this->grid0->setPageCount(20); $this->pager->setFor("grid0"); $this->pager->setCaption("Albums de ma musique"); $this->pager->setOnclick("home.getData"); $this->pager->setPageCount(20); 	}	public function displayHtml() {?><script>$.jPhoenix.getCSS('http://www.phox.loc/app/views/home/home.css');</script><script src='http://www.phox.loc/app/controllers/home/home.js'></script><div class="container-fluid">
    <div class="row-fluid">
        <div class="page-header">
            <?php $this->dummy->render(); ?>
        </div>
    </div>
        <!--left-->
        <div class="col-sm-3">
            <div id="dataGrid" >
                <div id="grid">
                    <?php $this->grid0->render(); ?>
                </div>
                <?php $this->pager->render(); ?>
            </div>
        </div><!--/left-->

        <!--center-->
        <div class="col-sm-6">
            <div class="row">
                <div id="vikipedia" class="col-xs-12">
                </div>
            </div>
            <hr>
            <hr>
        </div><!--/center-->

        <!--right-->
        <div class="col-sm-3">
            <h2>Side</h2>

            <div id="token" class="panel panel-default">

            </div>
            <hr>

        </div><!--/right-->
        <hr>        
</div>
<?php	}}