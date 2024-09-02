using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Documents
{
   public static class DocumentConstants
   {
      // -- The vertical space between elements in the document
      public static int VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS = 5;

      public static int VERTICAL_SPACE_LARGE_HEIGHT_IN_POINTS = 25;

      // -- Font Sizes -- /
      public static int FONT_SIZE_STANDARD = 10;
      // I like the same size heading, but separate for flexibility
      public static int FONT_SIZE_HEADING = 10;

      // -- The height of the heading rows like "Tally Infomration", "Pipe Information", etc
      public static float HEADING_ROW_HEIGHT = 15;

      // -- The height of each row in the pipe table -- /
      public static int PIPE_ROW_HEIGHT_IN_POINTS = 80;

      // -- The gap between columns in the pipe table --?
      public static int HORIZONTAL_SPACE_BETWEEN_PIPE_COLUMNS = 12;

      // -- This is the height of the entire page -- /
      // 720 is the height of the page in points excluding the footer (ie. usable page height)
      public static int PAGE_HEIGHT = 720;
   }  
}
